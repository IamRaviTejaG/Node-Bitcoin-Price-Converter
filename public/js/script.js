var c = <%= rate %>
function myFunction1() {
  document.getElementById('fiat_out').value = (parseFloat(document.getElementById('btc_in').value) * c).toFixed(2);
}
function myFunction2() {
  document.getElementById('btc_in').value = (parseFloat(document.getElementById('fiat_out').value) / c).toFixed(4);
}
