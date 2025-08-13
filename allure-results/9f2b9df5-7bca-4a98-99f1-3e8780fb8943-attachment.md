# Page snapshot

```yaml
- region "Notifications alt+T"
- dialog "Add New Animal":
  - heading "Add New Animal" [level=2]
  - paragraph: Enter the details for the new animal. Click save when you're done.
  - text: Tag Number *
  - textbox "e.g., A-001": A-001
  - text: Name*
  - textbox "Name*": Duplicate Tag Animal
  - text: Date of Birth *
  - textbox "Date of Birth *": 2024-02-02
  - text: Animal Type
  - combobox: Cow
  - text: Breed
  - textbox "Breed"
  - text: Gender
  - combobox: Female
  - text: Health Status
  - combobox: Healthy
  - text: Lactation Status
  - combobox: Inactive
  - text: Shed Location *
  - combobox: Auto Shed 1755074942428
  - text: Purchase Price ($)
  - spinbutton "Purchase Price ($)"
  - text: Animal Image (Optional)
  - button "Animal Image (Optional)"
  - button "Cancel"
  - button "Add Animal"
  - button "Close":
    - img
    - text: Close
```