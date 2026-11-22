---
title: Session 1 Game
draft: true
tags:
  - gdscript
  - godot
---

## Dictionary
```cs
using System;
using System.Collections.Generic;

namespace ZorkDemo
{
    class Room
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Dictionary<string, Room> Exits { get; set; } = new Dictionary<string, Room>();
        public List<string> Items { get; set; } = new List<string>();
    }

    class Program
    {
        static void Main(string[] args)
        {
            // 1. Setup World
            var clearing = new Room
            {
                Name = "Forest Clearing",
                Description = "You are standing in an open field west of a white house, with a boarded front door.",
                Items = new List<string> { "mailbox" }
            };

            var northOfHouse = new Room
            {
                Name = "North of House",
                Description = "You are facing the north side of a white house. There is no door here, and all the windows are barred.",
                Items = new List<string> { "rusty key" }
            };

            var forest = new Room
            {
                Name = "Deep Forest",
                Description = "This is a dimly lit forest, with large trees all around. You hear a faint humming to the south.",
                Items = new List<string> { "brass lantern" }
            };

            var cellar = new Room
            {
                Name = "Dark Cellar",
                Description = "A damp, pitch-black cellar. A narrow stone staircase leads back up."
            };

            // Connect Rooms
            clearing.Exits["north"] = northOfHouse;
            clearing.Exits["east"] = forest;
            northOfHouse.Exits["south"] = clearing;
            forest.Exits["west"] = clearing;
            forest.Exits["down"] = cellar;
            cellar.Exits["up"] = forest;

            // 2. Player State
            Room currentRoom = clearing;
            List<string> inventory = new List<string>();
            bool isPlaying = true;
            bool lanternLit = false;

            Console.WriteLine("ZORK MINI - A C# Text Adventure Demo");
            Console.WriteLine("Commands: go [direction], look, take [item], use [item], inventory, quit\n");
            DescribeRoom(currentRoom, lanternLit);

            // 3. Main Game Loop
            while (isPlaying)
            {
                Console.Write("\n> ");
                string input = Console.ReadLine()?.Trim().ToLower() ?? "";
                if (string.IsNullOrEmpty(input)) continue;

                string[] parts = input.Split(' ', 2);
                string verb = parts[0];
                string noun = parts.Length > 1 ? parts[1] : "";

                switch (verb)
                {
                    case "look":
                    case "l":
                        DescribeRoom(currentRoom, lanternLit);
                        break;

                    case "go":
                    case "move":
                        if (currentRoom.Exits.TryGetValue(noun, out Room nextRoom))
                        {
                            currentRoom = nextRoom;
                            DescribeRoom(currentRoom, lanternLit);
                        }
                        else
                        {
                            Console.WriteLine("You can't go that way.");
                        }
                        break;

                    // Allow shorthand directions (e.g., typing just "north")
                    case "north":
                    case "south":
                    case "east":
                    case "west":
                    case "up":
                    case "down":
                        if (currentRoom.Exits.TryGetValue(verb, out Room dirRoom))
                        {
                            currentRoom = dirRoom;
                            DescribeRoom(currentRoom, lanternLit);
                        }
                        else
                        {
                            Console.WriteLine("You can't go that way.");
                        }
                        break;

                    case "take":
                    case "get":
                        if (noun == "mailbox")
                        {
                            Console.WriteLine("It is securely anchored to the ground.");
                        }
                        else if (currentRoom.Items.Contains(noun))
                        {
                            currentRoom.Items.Remove(noun);
                            inventory.Add(noun);
                            Console.WriteLine($"Taken: {noun}.");
                        }
                        else
                        {
                            Console.WriteLine("You don't see that here.");
                        }
                        break;

                    case "use":
                        if (noun == "brass lantern" && inventory.Contains("brass lantern"))
                        {
                            lanternLit = !lanternLit;
                            Console.WriteLine(lanternLit ? "The brass lantern is now on." : "The brass lantern is now off.");
                            if (currentRoom == cellar) DescribeRoom(currentRoom, lanternLit);
                        }
                        else if (noun == "mailbox" && currentRoom == clearing)
                        {
                            Console.WriteLine("Opening the small mailbox reveals a leaflet that reads: 'Welcome to C# Zork!'");
                        }
                        else
                        {
                            Console.WriteLine("You can't use that right now.");
                        }
                        break;

                    case "inventory":
                    case "i":
                        Console.WriteLine(inventory.Count == 0
                            ? "You are empty-handed."
                            : "You are carrying: " + string.Join(", ", inventory));
                        break;

                    case "quit":
                    case "exit":
                        isPlaying = false;
                        Console.WriteLine("Thanks for playing!");
                        break;

                    default:
                        Console.WriteLine("I don't understand that command.");
                        break;
                }
            }
        }

        static void DescribeRoom(Room room, bool lanternLit)
        {
            Console.WriteLine($"\n--- {room.Name} ---");

            if (room.Name == "Dark Cellar" && !lanternLit)
            {
                Console.WriteLine("It is pitch black. You are likely to be eaten by a grue.");
                Console.WriteLine("Exits: up");
                return;
            }

            if (room.Name == "Dark Cellar" && lanternLit)
            {
                Console.WriteLine("Your lantern illuminates an ancient treasure chest sitting in the corner! You win!");
            }
            else
            {
                Console.WriteLine(room.Description);
            }

            if (room.Items.Count > 0)
            {
                Console.WriteLine("You see: " + string.Join(", ", room.Items));
            }

            Console.WriteLine("Exits: " + string.Join(", ", room.Exits.Keys));
        }
    }
}
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