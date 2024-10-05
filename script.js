let inventory = [];

// Function to add new ice cream
function addIceCream(flavor, price, quantity) {
	const newIceCream = {
		flavor,
		price,
		quantity
	};
	inventory.push(newIceCream);
	updateInventoryTable();
}

// Function to update ice cream
function updateIceCream(index, flavor, price, quantity) {
	inventory[index].flavor = flavor;
	inventory[index].price = price;
	inventory[index].quantity = quantity;
	updateInventoryTable();
}

// Function to calculate total value
function calculateTotalValue() {
	const totalValue = inventory.reduce((acc, iceCream) => acc + (iceCream.price * iceCream.quantity), 0);
	document.getElementById('total-value').textContent = totalValue.toFixed(2);
}

// Function to update inventory table
function updateInventoryTable() {
	const tbody = document.getElementById('inventory-tbody');
	tbody.innerHTML = '';
	inventory.forEach((iceCream, index) => {
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>${iceCream.flavor}</td>
			<td>$${iceCream.price}</td>
			<td>${iceCream.quantity}</td>
			<td>$${(iceCream.price * iceCream.quantity).toFixed(2)}</td>
			<td>
				<button onclick="updateIceCreamForm(${index})">Update</button>
				<button onclick="deleteIceCream(${index})">Delete</button>
			</td>
		`;
		tbody.appendChild(row);
	});
	calculateTotalValue();
}

// Function to delete ice cream
function deleteIceCream(index) {
	inventory.splice(index, 1);
	updateInventoryTable();
}

// Function to show update form
function updateIceCreamForm(index) {
	const updateForm = document.getElementById('update-form');
	updateForm.style.display = 'block';
	const addForm = document.getElementById('add-form');
	addForm.style.display = 'none';
	
	const iceCream = inventory[index];
	document.getElementById('update-flavor').value = iceCream.flavor;
	document.getElementById('update-price').value = iceCream.price;
	document.getElementById('update-quantity').value = iceCream.quantity;
	
	document.getElementById('update-btn').onclick = () => {
		updateIceCream(index, document.getElementById('update-flavor').value, parseFloat(document.getElementById('update-price').value), parseInt(document.getElementById('update-quantity').value));
		updateForm.style.display = 'none';
		addForm.style.display = 'block';
	};
}

// Add event listener to add button
document.getElementById('add-btn').addEventListener('click', () => {
	addIceCream(
		document.getElementById('flavor').value,
		parseFloat
