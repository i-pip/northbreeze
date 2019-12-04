const axios = require("axios"),
  baseUrl = 'http://services.odata.org/Northwind/Northwind.svc/ENTITY?$format=json&$skiptoken=TOKEN'
  json2csv = require('json2csv').parse,
  fs = require('fs'),
  entities = {
    Products: { 
      tokens: 4, 
      fields: [
        { label: 'ID', value: 'ProductID' },
        { label: 'name', value: 'ProductName' },
        { label: 'unitQuantity', value: 'QuantityPerUnit' },
        { label: 'unitPrice', value: 'UnitPrice' },
        { label: 'unitsinstock', value: 'UnitsInStock' },
        { label: 'unitsonorder', value: 'UnitsOnOrder' },
        { label: 'reorderlevel', value: 'ReorderLevel' },
        { label: 'discontinued', value: 'Discontinued' },
        { label: 'supplier_ID', value: 'SupplierID' },
        { label: 'category_ID', value: 'CategoryID' },
      ]
    },
    Suppliers: { 
      tokens: 1,
      fields: [
        { label: 'ID', value: 'SupplierID' } ,
        { label: 'name', value: 'CompanyName' } ,
        { label: 'country', value: 'Country' } ,
      ]
    },
    Categories: { 
      tokens: 1,
      fields: [
        {label: 'ID', value: 'CategoryID'},
        {label: 'name', value: 'CategoryName'},
        {label: 'description', value: 'Description'}
      ]
    }
  },
  buildUrl = (entity, n) => baseUrl
    .replace(/ENTITY/,entity)
    .replace(/TOKEN/,n * 20)
  range = x => [...Array(x).keys()],
  is = val => x => x === val,
  onlyCategories = is('Categories'),
  onlyProducts = is('Products'),
  onlySuppliers = is('Suppliers'),
  grab = entity => axios
    .all(range(entities[entity].tokens).map(x => axios.get(buildUrl(entity, x))))
    .then(xs => xs.reduce((a, x) => a.concat(x.data.value), []))

Object
  .keys(entities)
//.filter(onlyCategories)
  .forEach(entity => grab(entity)
    .then(xs => json2csv(xs, { fields: entities[entity].fields }))
    //.then(console.log)
    .then(
        data => fs.writeFileSync('data/' + entity + '.csv', data)
    )
  )

