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

## Init und Process

Notice how `_process()`, like `_init()`, starts with a leading underscore. By convention, Godot's virtual functions, that is to say, built-in functions you can override to communicate with the engine, start with an underscore.

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

## Quarternions 

Gutes Mathe-Tutorial dazu: [3Blue1Brown](https://www.youtube.com/watch?v=d4EgbgTm0Bg)