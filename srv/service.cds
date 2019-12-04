using pip.northbreeze from '../db/model';

service Breezy {
  entity Products   as projection on northbreeze.Products;
  entity Suppliers  as projection on northbreeze.Suppliers;
  entity Categories as projection on northbreeze.Categories;
  function hello(to : String) returns String;
}

service Restricted {
  entity Orders as projection on northbreeze.Orders excluding {
    createdAt,
    createdBy
  }
}