---
name: architecture-review
description: Performs architecture reviews. Use when the user asks for an architecture review or when the user asks for a review of their architecture.
---

# Instructions

Required inputs:

- customer_name
- workload_name
- environment
- location

If any required inputs are missing:

1. Call `get_parameters`
2. Pass the missing field names
3. Continue once values are returned
