from pydantic import BaseModel
from enum import Enum

class Voice(str, Enum):
    male = "male"
    female = "female"

class Persona(str, Enum):
    aggressive = "aggressive"
    passive = "passive"
    busy = "busy"

class Scenario(str, Enum):
    budget_shopper = "budget-shopper"
    wary_buyer = "wary-buyer"
    curious_inquirer = "curious-inquirer"

class SimulatorConfig(BaseModel):
    offering: str
    background: str
    voice: Voice
    persona: Persona
    scenario: Scenario
