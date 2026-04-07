---
title: GD Script Hints
draft: false
tags:
  - gdscript
  - godot
---

## Dictionary
```gdscript
var inventory = {
„healing heart“: 5,
„sword“: 1,
„shield“: 1
}

for element in inventory:
	var amount = inventory[element]
	display(element, amount)
```

Eigentlich müsste `for element in inventory` so heißen: `for element in inventory.keys()`, aber Godot erlaubt die Kurzschreibweise wie oben: 
> You can write the dictionary variable name directly after the `in` keyword in a `for` loop. GDscript automatically loops over the the dictionary‘s keys 

## Type hints

```gdscript
var cell_size: Vector2 = Vector2(80, 90)
```
GDscript kann sich das aber auch automatisch erschließen ("inferred") mit:
```gdscript
var cell_size := Vector2(80, 90)
```

## Was hat der Unterstrich (z.B. `_process()`) zu bedeuten?
**Bei Funktionen:** Notice how `_process()`, like `_init()`, starts with a leading underscore. By convention, Godot's virtual functions, that is to say, built-in functions you can override to communicate with the engine, start with an underscore.

**Bei Variablen oder Parametern:** In GDScript, a leading `_` on a variable or parameter name is commonly used to mark it as unused, which helps avoid “unused variable/parameter” warnings

## `@onready` vs. `func _ready`

Anstatt 
```gdscript
var my_label

func _ready():
	my_label = get_node("MyLabel")
```
lässt sich dieser Code auch mit 
```gdscript
@onready var my_label = get_node("MyLabel")
```
ausdrücken. 

## Type notation
*Was macht dieses `-> void` am Ende einer Funktionsdefinition?*

Beispiel:
```gdscript
func _on_button_pressed() -> void:
```

`-> void` ist die type notation in GDscript. Diese Angabe sagt aus, dass die Funktion also nichts zurück liefern sollte (d.h., die Funktion darf kein `return` beinhalten). Die Angabe von `-> void` ist grundsätzlich optional, aber gute Praxis

> [!warning] Vorsicht!
> `-> void` hat nichts mit `pass` zu tun. 

## Quarternions 

Gutes Mathe-Tutorial dazu: [3Blue1Brown](https://www.youtube.com/watch?v=d4EgbgTm0Bg)