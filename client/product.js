const selectVariation = document.getElementById('select-variation');
const variationName = document.getElementById('variation-name');
const variationImage = document.getElementById('variation-image');
const variationDescription = document.getElementById('variation-description');
const variationPrice = document.getElementById('variation-price');

selectVariation.addEventListener('change', (e) => {
  const pid = e.target.value;

  fetch(`/product/variations/${pid}`)
    .then(response => response.json())
    .then(data => {
      variationName.innerHTML = data.name;
      variationDescription.innerHTML = data.longDescription;
      variationPrice.innerHTML = `Price: ${data.price}$`;
      variationImage.src = data.image || 'https://via.placeholder.com/256?text=Picture+not+found';
    })
})