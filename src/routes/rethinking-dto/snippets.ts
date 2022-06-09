import { SnippetConfig } from "../../lib/blog/blogData";

const endpoint: SnippetConfig = {
  name: "Endpoint",
  language: "java",
  snippet: `
  public class Controller {
    // Getters, Constructors, Validation, and Documentation ommitted

    public class CreateProductRequest {
        private String name;
        private Double price;
    }
    
    public class ProductResponse {
        private Long id;
        private String name;
        private Double price;
    }
    
    @PostMapping("/products")
    public ResponseEntity<ProductResponse> createProduct(
        @RequestBody CreateProductRequest request
    ) { /*...*/ }
  }`
}

const productDto: SnippetConfig = {
  name: "ProductDTO",
  language: "java",
  snippet: `
  public enum ProductDTO {;
    private interface Id { @Positive Long getId(); }
    private interface Name { @NotBlank String getName(); }
    private interface Price { @Positive Double getPrice(); }
    private interface Cost { @Positive Double getCost(); }

    public enum Request{;
        @Value public static class Create implements Name, Price, Cost {
            String name;
            Double price;
            Double cost;
        }
    }

    public enum Response{;
        @Value public static class Public implements Id, Name, Price {
            Long id;
            String name;
            Double price;
        }

        @Value public static class Private implements Id, Name, Price, Cost {
            Long id;
            String name;
            Double price;
            Double cost;
        }
    }
}`
}

const syntaxError: SnippetConfig = {
  name: "SyntaxError",
  language: "java",
  snippet: `@Value public static class PatchPrice implements Id, Price {
    String id;    // Should be Long id;
    Double prise; // Should be Double price;

  // PatchPrice is not abstract and does not override abstract method getId() in Id
  // PatchPrice is not abstract and does not override abstract method getPrice() in Price
}`
};

const semantics: SnippetConfig = {
  name: "Semantics",
  language: "java",
  snippet: `  private interface Cost {
    /**
     * The amount that it costs us to purchase this product
     * For the amount we sell a product for, see the {@link Price Price} parameter.
     * <b>This data is confidential</b>
     */
    @Positive Double getCost();
}`
}

const generics: SnippetConfig = {
  name: "Generic Types",
  language: "java",
  snippet: `
  public class GenericExample {
    public static <T extends Price & Cost> Double getMarkup(T dto){
      return (dto.getPrice() - dto.getCost()) / dto.getCost();
  }
  }
  `
}

export default {
  endpoint,
  productDto,
  syntaxError,
  semantics,
  generics
}
