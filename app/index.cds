using from '../srv/service';

annotate northbreeze.Suppliers with @(UI : {
  SelectionFields : [],
  LineItem        : [
    {
      Value : ID,
      Label : 'ID'
    },
    {
      Value : name,
      Label : "Supplier Name",
    },
    {
      Value : country,
      Label : 'Origin'
    }
  ],
  HeaderInfo      : {TypeNamePlural : 'Suppliers'}
});