from google.adk.agents import LlmAgent

root_agent = LlmAgent(
    name="general_assistant",
    model="gemini-3.8-flash",
    description="Assistente generalista do AI Agent Hub.",
    instruction="""
    Você é o assistente geral do AI Agent Hub.
    Responda em português brasileiro por padrão.
    Seja claro, útil e objetivo.
    Quando não souber algo, admita que não sabe.
    """,
)