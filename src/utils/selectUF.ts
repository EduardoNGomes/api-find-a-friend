export function getUf(name: string) {
  switch (name.toLowerCase()) {
    case 'acre':
      return 'AC'
    case 'alagoas':
      return 'AL'
    case 'amapa':
      return 'AP'
    case 'amazonas':
      return 'AM'
    case 'bahia':
      return 'BA'
    case 'ceara':
      return 'CE'
    case 'espirito_santo':
      return 'ES'
    case 'goias':
      return 'GO'
    case 'maranhao':
      return 'MA'
    case 'mato_grosso':
      return 'MT'
    case 'mato_grosso_do_sul':
      return 'MS'
    case 'minas_gerais':
      return 'MG'
    case 'para':
      return 'PA'
    case 'paraiba':
      return 'PB'
    case 'parana':
      return 'PR'
    case 'pernambuco':
      return 'PE'
    case 'piaui':
      return 'PI'
    case 'rio_de_janeiro':
      return 'RJ'
    case 'rio_grande_do_norte':
      return 'RN'
    case 'rio_grande_do_sul':
      return 'RS'
    case 'rondonia':
      return 'RO'
    case 'roraima':
      return 'RR'
    case 'santa_catarina':
      return 'SC'
    case 'sao_paulo':
      return 'SP'
    case 'sergipe':
      return 'SE'
    case 'tocantins':
      return 'TO'
    default:
      return undefined
  }
}
