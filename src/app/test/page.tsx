import { getProducts } from "../../lib/woocommerce";

export default async function TestPage() {
  const products = await getProducts({ per_page: 5 });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">WooCommerce Connection Test</h1>
      {products.length > 0 ? (
        <div>
          <p className="text-green-600 mb-4">✅ Connection successful!</p>
          <div className="space-y-2">
            {products.map((product: any) => (
              <div key={product.id} className="border p-2 rounded">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-600">Price: ₹{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-red-600">❌ Connection failed</p>
      )}
    </div>
  );
}
