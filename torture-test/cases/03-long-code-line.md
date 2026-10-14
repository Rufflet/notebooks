<!-- What we test: code lines with no spaces wider than the page. They should wrap (or scroll in HTML) but never run off the page edge in PDF. -->

# 03 · Long code lines

```js
const veryLongConfigurationValueWithoutAnySpaces = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
fetch("https://api.example.com/v1/organizations/0000/projects/1111/environments/production/deployments?include=artifacts,logs,metrics&limit=100&sort=-created_at");
```

```text
2026-01-01T00:00:00.000Z ERROR [worker-7] java.lang.IllegalStateException: Unexpected state transition PENDING->COMPLETED at com.example.pipeline.scheduler.internal.StateMachine.transition(StateMachine.java:142)
```

Inline code too: `this_is_a_single_inline_identifier_that_is_much_longer_than_any_reasonable_line_width_in_a_pdf_document`.
