
import {
  Bot,
  Code2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export interface Agent {
  slug: string;
  name: string;
  description: string;
  category: string;
  icon: LucideIcon;
  available: boolean;
}

export const agents: Agent[] = [
  {
    slug: "general-assistant",
    name: "General Assistant",
    description: "Assistente inteligente para tarefas e dúvidas gerais.",
    category: "Assistente geral",
    icon: Bot,
    available: true,
  },
  {
    slug: "python-expert",
    name: "Python Expert",
    description: "Especialista em Python, automação e desenvolvimento.",
    category: "Programação",
    icon: Code2,
    available: false,
  },
  {
    slug: "code-reviewer",
    name: "Code Reviewer",
    description: "Análise de código, boas práticas e identificação de erros.",
    category: "Desenvolvimento",
    icon: ShieldCheck,
    available: false,
  },
];
