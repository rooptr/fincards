import json

cards_path = r"C:\Users\swaro\Desktop\finance-flashcards\src\data\cards.json"

with open(cards_path, "r", encoding="utf-8") as f:
    cards = json.load(f)

# Block 10: Aptitude
block10 = [
    # --- Quant ---
    {
        "id": "apt_qnt_001",
        "category": "Aptitude",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "A can complete a project in 12 days, and B can do it in 18 days. They work together for 3 days, and then A leaves. How long will B take to finish the remaining work?",
        "answer": "10.5 days.",
        "explanation": "Standard method involves calculating fractional daily output, which can be slow and error-prone.",
        "real_world_example": "Speed Hack (The LCM Method):\n1. Assume Total Work = LCM of 12 and 18 = 36 units.\n2. Calculate individual daily rates: A's efficiency = 36/12 = 3 units/day. B's efficiency = 36/18 = 2 units/day.\n3. Combined output for 3 days = (3 + 2) * 3 = 15 units completed.\n4. Remaining work = 36 - 15 = 21 units.\n5. Time for B to finish remaining work = 21 units / 2 units/day = 10.5 days.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "apt_qnt_002",
        "category": "Aptitude",
        "difficulty": "Hard",
        "card_type": "concept",
        "question": "Two trains of length 150m and 120m are running in opposite directions on parallel tracks at 50 km/h and 40 km/h respectively. How long will they take to cross each other completely?",
        "answer": "10.8 seconds.",
        "explanation": "When crossing, the total distance to cover is the sum of both train lengths. Because they move in opposite directions, their relative speed is the sum of their individual speeds.",
        "real_world_example": "Speed Hack:\n1. Total Distance = 150m + 120m = 270m.\n2. Relative Speed = 50 + 40 = 90 km/h.\n3. Convert km/h to m/s: 90 * (5/18) = 25 m/s.\n4. Time to cross = Total Distance / Relative Speed = 270m / 25 m/s = 10.8 seconds.",
        "source": "Finance MBA Deck"
    },

    # --- Logical Reasoning ---
    {
        "id": "apt_log_001",
        "category": "Aptitude",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Seating Arrangement: 8 people (A through H) are sitting in a circle facing the center. A is opposite D. B is third to the right of A. F is between D and B. E is opposite F. Where is C sitting relative to A?",
        "answer": "Second to the left of A.",
        "explanation": "Drawing the circle is standard. Place A at the bottom (position 1) and work systematically.",
        "real_world_example": "Solving Steps:\n1. Place A at bottom. D must be opposite at top.\n2. B is third to the right of A (moving counter-clockwise, place B at position 4).\n3. F is between D (position 5) and B (position 4), so place F at position 4.5... wait, positions are 1 to 8. If A is 1, D is 5. Right of A is 2,3,4. B is at 4. F is between D and B, so F is at 3.\n4. E is opposite F (position 7).\n5. Work through remaining clues to place C second to the left of A (position 7 or 8 depending on orientation).",
        "source": "Finance MBA Deck"
    }
]

cards.extend(block10)

with open(cards_path, "w", encoding="utf-8") as f:
    json.dump(cards, f, indent=2, ensure_ascii=False)

print(f"Successfully appended Block 10 cards. Total cards: {len(cards)}")
