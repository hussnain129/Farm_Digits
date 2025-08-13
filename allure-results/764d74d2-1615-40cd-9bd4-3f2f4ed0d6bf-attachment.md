# Page snapshot

```yaml
- region "Notifications alt+T"
- dialog "Add New Animal":
  - heading "Add New Animal" [level=2]
  - paragraph: Enter the details for the new animal. Click save when you're done.
  - text: Tag Number *
  - textbox "e.g., A-001"
  - paragraph: Tag ID is required*
  - text: Name*
  - textbox "Name*"
  - paragraph: Name is required*
  - text: Date of Birth *
  - textbox "Date of Birth *"
  - paragraph: Date of birth is required*
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
  - combobox: Select location
  - paragraph: Shed location is required*
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