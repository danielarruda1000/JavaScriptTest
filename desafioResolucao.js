var facts = [
    ['gabriel', 'endereço', 'av rio branco, 109', true],
    ['joão', 'endereço', 'rua alice, 10', true],
    ['joão', 'endereço', 'rua bob, 88', true],
    ['joão', 'telefone', '234-5678', true],
    ['joão', 'telefone', '91234-5555', true],
    ['joão', 'telefone', '234-5678', false],
    ['gabriel', 'telefone', '98888-1111', true],
    ['gabriel', 'telefone', '56789-1010', true],
];

var schema = [
    ['endereço', 'cardinality', 'one'],
    ['telefone', 'cardinality', 'many']
];

function endereco(array) {

    function enderecos(currentArray) { return currentArray[1] == 'endereço' }
    function atualEndereco(currentArray) { return currentArray[2] == enderecoAtual }

    const enderecosArr = array.filter(enderecos);
    let enderecosQtd = enderecosArr.length;
    const enderecoAtual = enderecosArr[enderecosQtd - 1][2];

    return enderecosArr.filter(atualEndereco);
}

function telefones(array) {
    try {

        function telefones(currentArray) { return currentArray[1] == 'telefone' }
        function telefoneFalse(currentArray) { return currentArray[3] == false }
        function removeTels(currentArray) { return currentArray[2] != numTelefoneFalse }

        const telefoneArr = array.filter(telefones);
        const telFalse = telefoneArr.filter(telefoneFalse);
        let numTelefoneFalse = telFalse[0][2];

        return telefoneArr.filter(removeTels);
    } catch (err) {
        function telefones(currentArray) { return currentArray[1] == 'telefone' }
        return array.filter(telefones)
    }
}

function dadosVigentes(facts, schema) {


    function dadosJoao(currentArray) {
        return currentArray[0] === 'joão';
    }
    function dadosGabriel(currentArray) {
        return currentArray[0] === 'gabriel'
    }

    const joao = facts.filter(dadosJoao);
    const gabriel = facts.filter(dadosGabriel);

    const joaoEndereco = endereco(joao);
    const joaoTels = telefones(joao);

    const gabrielEndereco = endereco(gabriel);
    const gabrielTels = telefones(gabriel);

    return gabrielEndereco.concat(joaoEndereco).concat(joaoTels).concat(gabrielTels);

}

console.log(dadosVigentes(facts, schema))