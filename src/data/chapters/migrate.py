import json

target_file = r"C:\Users\swaro\Desktop\finance-flashcards\src\data\chapters\wacc.json"

with open(target_file, "r") as f:
    old_data = json.load(f)

new_data = {
    "schema_version": "1.0",
    "content_version": "1.0",
    "canonical_concept_model": {
        "topic": old_data.get("topic", "Weighted Average Cost of Capital"),
        "domain": old_data.get("domain", "Corporate Finance"),
        "definition": old_data.get("definition", ""),
        "purpose": old_data.get("purpose", "")
    },
    "curriculum": {
        "prerequisites": old_data.get("prerequisites", []),
        "position_in_syllabus": "Advanced Corporate Finance",
        "difficulty_level": "Intermediate"
    },
    "teaching_blueprint": {
        "target_audience": "Undergraduate/MBA",
        "estimated_time_minutes": 45,
        "primary_learning_goal": "Understand the blended opportunity cost of capital for a firm.",
        "learning_outcomes": [
            "Calculate after-tax cost of debt",
            "Understand the risk difference between debt and equity",
            "Apply WACC as a hurdle rate for investment projects"
        ]
    },
    "dependency_package": {
        "required_prior_knowledge": old_data.get("prerequisites", []),
        "suggested_subsequent_topics": ["Capital Budgeting", "DCF Valuation", "Mergers & Acquisitions"]
    },
    "review_package": {
        "summary_points": [
            "WACC is the average cost of capital from all sources.",
            "Debt is cheaper than equity due to risk priority.",
            "Interest tax shield lowers effective cost of debt.",
            "WACC is the hurdle rate for corporate investments."
        ],
        "quiz_questions": [
            {
                "question": "Why is the cost of equity higher than the cost of debt?",
                "answer": "Equity investors bear residual risk and are paid last in the event of liquidation, so they require a higher return."
            }
        ]
    },
    "visualization_hints": {
        "theme": "Corporate Finance",
        "primary_colors": ["blue", "green"],
        "style": "professional",
        "font_family": "sans-serif"
    },
    "scenes": []
}

diagrams = {
    "wacc_funding": {
        "type": "flow_chart",
        "title": "Capital Flow",
        "nodes": ["Equity Investors", "Debt Lenders", "Corporate Bucket"],
        "edges": [{"from": "Equity Investors", "to": "Corporate Bucket"}, {"from": "Debt Lenders", "to": "Corporate Bucket"}]
    },
    "wacc_debt_vs_equity": {
        "type": "balance_scale",
        "title": "Risk Priority Scale",
        "left_side": "Senior Debt (Low Risk, Guaranteed)",
        "right_side": "Common Equity (High Risk, Residual)"
    },
    "wacc_tax_shield": {
        "type": "waterfall_chart",
        "title": "Tax Shield Impact",
        "steps": ["Pre-Tax Cost of Debt", "Tax Shield Deduction", "Post-Tax Cost of Debt"]
    },
    "wacc_weighting": {
        "type": "pie_chart",
        "title": "Capital Structure Weights",
        "segments": [{"label": "Equity", "value": "E / (E + D)"}, {"label": "Debt", "value": "D / (E + D)"}]
    },
    "wacc_hurdle": {
        "type": "line_and_bar_chart",
        "title": "WACC Hurdle Rate",
        "x_axis": "Projects",
        "y_axis": "Return Rate (%)",
        "series": ["WACC (Line)", "IRR (Bars)"]
    }
}

for scene in old_data.get("scenes", []):
    content = scene.get("content", {})
    scene_id = scene.get("id", "")
    
    formula_pkg = {}
    if "tax" in scene_id:
        formula_pkg = {"equation": "r_d * (1 - T)", "variables": {"r_d": "cost of debt", "T": "tax rate"}}
    elif "weighting" in scene_id:
        formula_pkg = {"equation": "W_e = E / (E + D), W_d = D / (E + D)", "variables": {"E": "Market value of equity", "D": "Market value of debt"}}
    elif "hurdle" in scene_id:
        formula_pkg = {"equation": "NPV = sum(CF_t / (1 + WACC)^t)", "variables": {"CF_t": "Cash flow at time t", "WACC": "Weighted Average Cost of Capital"}}
        
    new_scene = {
        "scene_type": scene.get("type", "concept"),
        "learning_objective": scene.get("learning_goal", ""),
        "transition_package": {
            "id": scene_id,
            "title": scene.get("title", ""),
            "purpose": scene.get("purpose", ""),
            "entry_animation": "fade_in",
            "exit_animation": "fade_out"
        },
        "formula_package": formula_pkg,
        "illustration_package": scene.get("illustration", {}),
        "diagram_package": diagrams.get(scene_id, {}),
        "animation_package": scene.get("motion", {}),
        "widget_package": scene.get("widget", {}),
        "misconception_package": {
            "common_mistakes": content.get("mistakes", []),
            "correction_strategy": "Highlight the difference between book and market values, and clarify risk priority."
        },
        "interview_package": {
            "question": "How would you explain this in an investment banking interview?",
            "answer": content.get("interview", ""),
            "key_buzzwords": ["Hurdle Rate", "Opportunity Cost", "Tax Shield", "Capital Structure"]
        },
        "eli5_package": {
            "story": content.get("story", ""),
            "explanation": content.get("eli5", ""),
            "analogy": "Think of it like borrowing money to buy a house."
        },
        "mba_package": {
            "explanation": content.get("mba", ""),
            "academic_context": "Corporate Finance Theory"
        },
        "qa_package": {
            "takeaways": content.get("takeaways", []),
            "discussion_prompt": "Why do different industries have different WACC?"
        }
    }
    
    new_data["scenes"].append(new_scene)

with open(target_file, "w") as f:
    json.dump(new_data, f, indent=2)

print("Migration complete!")
