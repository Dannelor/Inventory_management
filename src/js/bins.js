function updateQuantity(binID, UPC, quantity) {
  // If called without quantity, prompt user for quantity
  if (quantity == null) {
    bootbox.prompt({
      title: 'Update Quantity',
      inputType: 'number',
      value: quantity,
      min: 1,
      callback: function(result) {
        if (result != null) updateQuantity(binID, UPC, result)
      },
    })
  } else {
    // Notify server of quantity change
    $.ajax({
      url: '/api/item/updatequantity',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify({ binID: binID, UPC: UPC, quantity: quantity }),
      contentType: 'application/json; charset=utf-8',
      success: function(response) {
        window.location.reload()
      },
      error: function() {
        alert(error)
      },
    })
  }
}

function removeItem(binID, UPC) {
  // Confirm deletion of item
  bootbox.confirm('Are you sure you want to delete ' + UPC + '?', function(
    result
  ) {
    if (result != null) {
      // Notify server of removal
      $.ajax({
        url: '/api/item/remove',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({ binID: binID, UPC: UPC }),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
          window.location = '..'
        },
        error: function() {
          alert(error)
        },
      })
    }
  })
}
