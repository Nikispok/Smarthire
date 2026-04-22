import os
from groq import Groq

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

def get_ai_advice(company, role):
    prompt = f"""
You are a career assistant.

Job role: {role}
Company: {company}

Give short, practical advice:
- what to highlight in CV
- key skills
- one interview tip

Keep it short and clear.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content