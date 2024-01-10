// Import modul-modul yang diperlukan dari Azle
import { Principal, text, nat, record, Vec, query, update, Canister, Void } from 'azle';

// Definisikan tipe data Product
type Product = {
  productId: nat;
  name: text;
  description: text;
  price: nat;
};

// Definisikan tipe data UMKM
type UMKM = {
  ownerId: Principal;
  storeName: text;
  products: Vec<Product>;
};

// Inisialisasi variabel umkm
let umkm: UMKM = {
  ownerId: Principal.fromText('your_principal_id_here'), // Ganti dengan ID Principal Anda
  storeName: 'UMKM Store',
  products: [],
};

// Definisikan service Canister
service : { 
  // Metode untuk mendapatkan informasi toko
  query : public({}) : async () -> UMKM;
  // Metode untuk mendapatkan daftar produk
  query : public({}) : async () -> Vec<Product>;
  // Metode untuk menambahkan produk
  update : public(record({ name: text, description: text, price: nat })) : async () -> Void;
};

// Implementasi service Canister
service : {
  query getStoreInfo() : UMKM {
    return umkm;
  };

  query getProducts() : Vec<Product> {
    return umkm.products;
  };

  update addProduct(newProduct: record({ name: text, description: text, price: nat })) : Void {
    const productId = umkm.products.length + 1;
    const product: Product = {
      productId,
      ...newProduct,
    };

    umkm.products.push(product);
  };
};

