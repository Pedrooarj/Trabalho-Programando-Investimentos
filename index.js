function calcularComparacao() {
    var carPrice = parseFloat(document.getElementById('carPrice').value);

    if (isNaN(carPrice) || carPrice <= 0) {
        alert('Insira um valor válido para o preço do carro.');
        return;
    }

    var descontoAVista = carPrice * 0.1;
    var precoAVista = carPrice - descontoAVista;

    var financiamentoJurosNominais = 0.2; // 20%
    var financiamentoParcelas = 24;
    var jurosReais = 0.09; // 9%
    var jurosFinanciamento = carPrice * financiamentoJurosNominais * (financiamentoParcelas / 12);
    var precoFinanciado = carPrice + jurosFinanciamento;

    var consorcioTaxaAdmin = 0.1; // 10%
    var consorcioParcelas = 60;
    var fundoComum = carPrice * (1.6667 / 100);
    var taxaAdmin = carPrice * (consorcioTaxaAdmin / 100);
    var valorParcelaConsorcio = (fundoComum + taxaAdmin) * consorcioParcelas;

    var resultadoHTML = `
        <h2>Resultados da Comparação:</h2>
        <p>At sight: R$ ${precoAVista.toFixed(2)}</p>
        <p>Financed: R$ ${precoFinanciado.toFixed(2)} (Fees: R$ ${jurosFinanciamento.toFixed(2)})</p>
        <p>Consortium: R$ ${valorParcelaConsorcio.toFixed(2)} (Without comparing reserve founds)</p>
    `;

    document.getElementById('result').innerHTML = resultadoHTML;

    // Configuração do gráfico
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['At sight', 'Financed', 'Consortium'],
            datasets: [{
                label: 'End price',
                data: [precoAVista, precoFinanciado, valorParcelaConsorcio],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}