from langchain.pydantic_v1 import BaseModel, Field
from langgraph.graph import MessagesState, StateGraph, END
from typing import TypedDict
from langgraph.prebuilt import ToolNode
from langchain.chat_models import init_chat_model
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain.agents.react.agent import create_react_agent
import os
from dotenv import load_dotenv

load_dotenv()

search = TavilySearchResults(max_results=2)
model = init_chat_model("gemini-2.0-flash", model_provider="google_genai")

#Define structured output
class CommanderSorceryCards(BaseModel):
  """Response to the user"""
  Cards: list[str] = Field(description="A list of Magic the Gathering sorcery card names.")

#Define input, output, and state
class AgentInput(MessagesState):
  pass

class AgentOutput(TypedDict):
  #Final structured response from the agent
  final_response: CommanderSorceryCards
  
class AgentState(MessagesState):
  #Final structure response from the agent
  final_response: CommanderSorceryCards

tools = [search, CommanderSorceryCards]

agent_executor = model.bind_tools(tools, tool_choice="any")
#Define graph nodes

def call_model(state: AgentState):
  response = agent_executor.invoke(state['messages'])
  return {"messages": [response]}

def respond(state: AgentState):
  response = CommanderSorceryCards(**state['messages'][-1].tool_calls[0]['args'])
  return {"final_response": response}

#Define routing function
def should_continue(state: AgentState):
  messages = state["messages"]
  last_message = messages[-1]
  if len(last_message.tool_calls) == 1 and last_message.tool_calls[0]['name'] == "CommanderSorceryCards":
    return "respond"
  else:
    return "continue"

#Define graph structure
workflow = StateGraph(AgentState, input=AgentInput, output=AgentOutput)

workflow.add_node("agent", call_model)
workflow.add_node("respond", respond)
workflow.add_node("tools", ToolNode(tools))

#Entry point
workflow.set_entry_point("agent")

workflow.add_conditional_edges(
  "agent",
  should_continue,
  {
    "continue": "tools",
    "respond": "respond",
  },
)

workflow.add_edge("tools", "agent")
workflow.add_edge("respond", END)
graph = workflow.compile()


def generate_sorcery_cards(commander: str, card_number: int) -> CommanderSorceryCards:
  answer = graph.invoke(input={"messages": [("human", f"Generate me {card_number} sorcery cards for a Magic the Gathering deck using {commander} as the commander.")]})
  return answer["final_response"]



