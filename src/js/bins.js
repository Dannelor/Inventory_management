function updateQuantity(binID, UPC, quantity) {
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
    $.ajax({
      url: '/api/item/updatequantity',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify({ binID: binID, UPC: UPC, quantity: quantity }),
      contentType: 'application/json; charset=utf-8',
      success: function(response) {
        console.log(response)
      },
      error: function() {
        alert(error)
      },
    })
  }
}

function removeItem(binID, UPC) {
  bootbox.confirm('Are you sure you want to delete ' + UPC + '?', function(
    result
  ) {
    if (result != null) {
      $.ajax({
        url: '/api/item/remove',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({ binID: binID, UPC: UPC }),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
          console.log(response)
        },
        error: function() {
          alert(error)
        },
      })
    }
  })
}
