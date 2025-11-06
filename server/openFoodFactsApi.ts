/**
 * Open Food Facts API Integration
 * https://world.openfoodfacts.net/api/v2/product/{barcode}
 */

export interface OpenFoodFactsProduct {
  code: string;
  product?: {
    product_name?: string;
    brands?: string;
    ingredients_text?: string;
    ingredients_text_en?: string;
    ingredients?: Array<{
      id: string;
      text: string;
      percent_estimate?: number;
    }>;
    nutriments?: {
      sugars_100g?: number;
      salt_100g?: number;
      fat_100g?: number;
      [key: string]: any;
    };
    nutrition_grades?: string;
    image_url?: string;
    image_front_url?: string;
  };
  status: number;
  status_verbose: string;
}

export async function fetchProductByBarcode(barcode: string): Promise<OpenFoodFactsProduct> {
  const url = `https://world.openfoodfacts.net/api/v2/product/${barcode}?fields=product_name,brands,ingredients_text,ingredients_text_en,ingredients,nutriments,nutrition_grades,image_url,image_front_url`;
  
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'SmartFoodRiskAnalyzer/1.0 (https://smartfoodrisk.com)',
    },
  });

  if (!response.ok) {
    throw new Error(`Open Food Facts API error: ${response.statusText}`);
  }

  return response.json();
}

export function extractIngredients(product: OpenFoodFactsProduct): string {
  if (!product.product) {
    return '';
  }

  // Try ingredients_text_en first (English), then ingredients_text (any language)
  const ingredientsText = product.product.ingredients_text_en || product.product.ingredients_text;
  
  if (ingredientsText) {
    return ingredientsText;
  }

  // Fallback: try to construct from ingredients array
  if (product.product.ingredients && product.product.ingredients.length > 0) {
    return product.product.ingredients.map(ing => ing.text).join(', ');
  }

  return '';
}
