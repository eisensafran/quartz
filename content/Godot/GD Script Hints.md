```
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
> You can write the dictionary variable name directly after the `ìn`keyword in a `for`loop. GDscript automatically loops over the the dictionary‘s keys 

## Type hints

```
var cell_size: Vector2 = Vector2(80, 90)
```
GDscript kann sich das aber auch automatisch erschließen mit:
```
var cell_size := Vector2(80, 90)
```

## Init und Process

Notice how `_process()`, like `_init()`, starts with a leading underscore. By convention, Godot's virtual functions, that is to say, built-in functions you can override to communicate with the engine, start with an underscore.