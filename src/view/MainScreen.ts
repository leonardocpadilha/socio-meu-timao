import readline from 'readline-sync';

export default class MainScreen {
    public showBanner(): void {
        console.clear();
        console.log(`
┌────────────────────────────────────────────────┐
│                SÓCIO MEU TIMÃO                 │
│     Sua paixão pelo Corinthians começa aqui    │
└────────────────────────────────────────────────┘
        `);
        console.log("Bem-vindo Corinthiano(a)! Escolha uma das opções abaixo para começar:\n");
    }

    public showMenu(): number {
        const options = [
            "Login",
            "Cadastre-se",
            "Conheça",
            "Planos"
        ];

        return readline.keyInSelect(options, "Por onde você quer iniciar? ", { cancel: "Sair" });
    }

    public pedirDadosCadastro(): { nome: string; cpf: string; dataNascimento: string; email: string, senha: string} {
        const nome = readline.question("Digite seu nome: ");
        const cpf = readline.question("Digite seu CPF: ");
        const dataNascimento = readline.question("Digite sua data de nascimento (dd/mm/aaaa): ");
        const email = readline.questionEMail("Digite seu e-mail: ");
        const senha = readline.question("Crie sua senha: ", { hideEchoBack: true });

        
        return { nome, cpf, dataNascimento, email, senha,};
    }

    public mostrarMensagem(mensagem: string): void {
        console.log(`\n${mensagem}`);
        readline.keyInPause("Pressione qualquer tecla para continuar...");
    }

    public solicitarDadosLogin(): { cpf: string; senha: string } {
        const cpf = readline.question("Digite seu CPF: ");
        const senha = readline.question("Digite sua senha: ", { hideEchoBack: true });
        
        return { cpf, senha };
    }
}