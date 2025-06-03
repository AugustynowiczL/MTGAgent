from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from agent.creatureAgent import generate_creature_cards  
from agent.artifactAgent import generate_artifact_cards  
from agent.enchantmentAgent import generate_enchantment_cards  
from agent.instantAgent import generate_instant_cards  
from agent.landAgent import generate_land_cards  
from agent.sorceryAgent import generate_sorcery_cards  
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class CardRequest(BaseModel):
    commander: str
    card_number: int

class CardResponse(BaseModel):
    Cards: List[str]

class DeckRequest(BaseModel):
    commander: str
    creature_number: int
    sorcery_number: int
    artifact_number: int
    enchantment_number: int
    instant_number: int
    land_number: int

class DeckResponse(BaseModel):
    creatureCards: List[str]
    artifactCards: List[str]
    enchantmentCards: List[str]
    instantCards: List[str]
    sorceryCards: List[str]
    landCards: List[str]
    

@app.post("/creatureCards", response_model=CardResponse)
async def generate_sorcery_cards_api(request: CardRequest):
    final_response = generate_creature_cards(request.commander, request.card_number)
    
    return CardResponse(Cards=final_response.Cards)

@app.post("/artifactCards", response_model=CardResponse)
async def generate_sorcery_cards_api(request: CardRequest):
    final_response = generate_artifact_cards(request.commander, request.card_number)
    return CardResponse(Cards=final_response.Cards)

@app.post("/enchantmentCards", response_model=CardResponse)
async def generate_sorcery_cards_api(request: CardRequest):
    final_response = generate_enchantment_cards(request.commander, request.card_number)
    
    return CardResponse(Cards=final_response.Cards)

@app.post("/instantCards", response_model=CardResponse)
async def generate_sorcery_cards_api(request: CardRequest):
    final_response = generate_instant_cards(request.commander, request.card_number)
    
    return CardResponse(Cards=final_response.Cards)

@app.post("/landCards", response_model=CardResponse)
async def generate_sorcery_cards_api(request: CardRequest):
    final_response = generate_land_cards(request.commander, request.card_number)
    
    return CardResponse(Cards=final_response.Cards)

@app.post("/sorceryCards", response_model=CardResponse)
async def generate_sorcery_cards_api(request: CardRequest):
    final_response = generate_sorcery_cards(request.commander, request.card_number)
    
    return CardResponse(Cards=final_response.Cards)

@app.post("/fullDeck", response_model=DeckResponse)
async def generate_deck_cards_api(request: DeckRequest):
    creature_response = generate_creature_cards(request.commander, request.creature_number).Cards
    sorcery_response = generate_sorcery_cards(request.commander, request.sorcery_number).Cards
    artifact_response = generate_artifact_cards(request.commander, request.artifact_number).Cards
    enchantment_response = generate_enchantment_cards(request.commander, request.enchantment_number).Cards
    instants_response = generate_instant_cards(request.commander, request.instant_number).Cards
    lands_response = generate_land_cards(request.commander, request.land_number).Cards
    return DeckResponse(creatureCards=creature_response,
                        sorceryCards=sorcery_response,
                        artifactCards=artifact_response,
                        enchantmentCards=enchantment_response,
                        instantCards=instants_response,
                        landCards=lands_response)