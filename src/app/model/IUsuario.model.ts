export interface IUsuario{
    id?: number;
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    telefone: number | null;
}