const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function sendMessage(message: string): Promise<string> {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.detail || `Erro na API: ${response.status}`
    );
  }

  const data = await response.json();

  const reply =
    data.response ??
    data.reply ??
    data.output ??
    data.text;

  if (typeof reply !== "string") {
    throw new Error(
      "A API respondeu, mas não foi possível identificar o texto da resposta."
    );
  }

  return reply;
}
