import json

cards_path = r"C:\Users\swaro\Desktop\finance-flashcards\src\data\cards.json"

with open(cards_path, "r", encoding="utf-8") as f:
    cards = json.load(f)

# Block 6: Derivatives & Economics
block6 = [
    # --- Derivatives ---
    {
        "id": "der_opt_001",
        "category": "Derivatives",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is the difference between the Intrinsic Value and the Time Value of an option?",
        "answer": "Intrinsic Value is the absolute profit if the option were exercised immediately. Time Value is the remaining premium paid for the probability that the option's value will increase before expiration.",
        "explanation": "Option Premium = Intrinsic Value + Time Value. For a call option, Intrinsic Value = Max(0, Stock Price - Strike Price). At expiration, Time Value decays to exactly zero, leaving only the Intrinsic Value.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "der_cds_001",
        "category": "Derivatives",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Explain the mechanics of a Credit Default Swap (CDS). How do you trade it if you expect a corporate default?",
        "answer": "A CDS acts as credit insurance. The protection buyer pays a recurring spread to the protection seller. To bet on a default, you BUY protection (paying the spread and receiving par value if default occurs).",
        "explanation": "If the reference entity defaults, the protection seller must buy the defaulted bond at par or pay the cash difference. As default probability rises, the CDS spread increases, allowing protection buyers to sell the contract for a profit before default even occurs.",
        "real_world_example": "During the 2008 financial crisis, hedge funds like Paulson & Co. bought CDS protection on subprime mortgage CDOs, generating billions in profits when those mortgage tranches defaulted.",
        "source_link": "https://www.reuters.com/article/us-hedgefunds-paulson-idUSN1533036420080115",
        "source": "Finance MBA Deck"
    },

    # --- Economics & Central Banking ---
    {
        "id": "eco_cb_001",
        "category": "Economics",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "Explain the difference between CPI (Consumer Price Index) and WPI (Wholesale Price Index). Which one is targeted by central banks?",
        "answer": "CPI measures retail price changes of goods and services purchased by households. WPI measures wholesale inflation of raw goods traded by businesses. Central banks target CPI.",
        "explanation": "CPI includes services (rent, transport, healthcare), which dominate consumer budgets. WPI focuses strictly on manufacturing, inputs, and physical goods. In India, the RBI uses CPI-Combined for its inflation targeting framework.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "eco_cb_002",
        "category": "Economics",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "What is the difference between Quantitative Easing (QE) and Quantitative Tightening (QT)? How do they impact interest rates?",
        "answer": "QE is when a central bank purchases government bonds to inject cash into the economy, lowering long-term interest rates. QT is the opposite—selling or retiring bonds to extract cash, pushing long-term rates higher.",
        "explanation": "QE is used when policy interest rates are at or near zero. By buying long-term bonds, the central bank reduces the yield on those bonds, forcing investors to put their cash into riskier assets like stocks or corporate debt, stimulating borrowing. QT cools down inflation by drying up this excess cash.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "eco_cad_001",
        "category": "Economics",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Explain the Balance of Payments (BOP). What causes a Current Account Deficit (CAD)?",
        "answer": "BOP tracks all economic transactions between a country and the rest of the world. CAD occurs when a country imports more goods, services, and transfers than it exports.",
        "explanation": "BOP consists of the Current Account (trade in goods/services) and the Capital Account (financial investments). A Current Account Deficit must be offset by a Capital Account Surplus (attracting foreign investments like FDI or FPI) to keep the overall BOP in balance.",
        "source": "Finance MBA Deck"
    }
]

cards.extend(block6)

with open(cards_path, "w", encoding="utf-8") as f:
    json.dump(cards, f, indent=2, ensure_ascii=False)

print(f"Successfully appended Block 6 cards. Total cards: {len(cards)}")
