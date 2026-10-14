<!-- What we test: syntax highlighting for common and less common languages; colors must survive printing (background colors are often dropped). Unknown languages should fall back to plain monospace. -->

# 17 · Syntax highlighting

```typescript
interface User { id: number; name: string }
const greet = (u: User): string => `Hello, ${u.name}`;
```

```rust
fn main() {
    let v: Vec<i32> = (1..=5).map(|x| x * x).collect();
    println!("{:?}", v);
}
```

```haskell
quicksort :: Ord a => [a] -> [a]
quicksort []     = []
quicksort (p:xs) = quicksort [x | x <- xs, x < p] ++ [p] ++ quicksort [x | x <- xs, x >= p]
```

```elixir
defmodule Greeter do
  def hello(name), do: "Hello, #{name}!"
end
```

```diff
- const color = "red";
+ const color = "green";
```

```not-a-real-language
This block uses an unknown language tag and must still render as code.
```
