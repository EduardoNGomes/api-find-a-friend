import { State } from '@prisma/client'

export interface StatesOptions {
  name:
    | 'acre'
    | 'alagoas'
    | 'amapa'
    | 'amazonas'
    | 'bahia'
    | 'ceara'
    | 'espirito_santo'
    | 'goias'
    | 'maranhao'
    | 'mato_grosso'
    | 'mato_grosso_do_sul'
    | 'minas_gerais'
    | 'para'
    | 'paraiba'
    | 'parana'
    | 'pernambuco'
    | 'piaui'
    | 'rio_de_janeiro'
    | 'rio_grande_do_norte'
    | 'rio_grande_do_sul'
    | 'rondonia'
    | 'roraima'
    | 'santa_catarina'
    | 'sao_paulo'
    | 'sergipe'
    | 'tocantins'

  uf:
    | 'AC'
    | 'AL'
    | 'AP'
    | 'AM'
    | 'BA'
    | 'CE'
    | 'ES'
    | 'GO'
    | 'MA'
    | 'MT'
    | 'MS'
    | 'MG'
    | 'PA'
    | 'PB'
    | 'PR'
    | 'PE'
    | 'PI'
    | 'RJ'
    | 'RN'
    | 'RS'
    | 'RO'
    | 'RR'
    | 'SC'
    | 'SP'
    | 'SE'
    | 'TO'
}

export interface StatesRepository {
  create(name: StatesOptions): Promise<State>
  findById(id: string): Promise<State | null>
}