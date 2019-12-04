namespace pip.northbreeze;

using {
  managed,
  cuid
} from '@sap/cds/common';

entity Products : managed {
  key ID           : Integer;
      name         : String;
      supplier     : Association to Suppliers;
      category     : Association to Categories;
      unitQuantity : String;
      unitPrice    : Decimal(9, 2);
      unitsinstock : Integer;
      unitsonorder : Integer;
      reorderlevel : Integer;
      discontinued : Boolean;
}

entity Suppliers : managed {
  key ID       : Integer;
      products : Association to many Products on products.supplier = $self;
      name     : String(40);
      country  : String(15);
}

entity Categories : managed {
  key ID          : Integer;
      products    : Association to many Products on products.category = $self;
      name        : String(15);
      description : String;
}

entity Orders : managed, cuid {
  quantity : Integer;
}