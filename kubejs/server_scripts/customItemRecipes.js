ServerEvents.recipes(e => {
	e.shapeless(
		Item.of('kubejs:meat_chunk', 4),
		[
			'kubejs:meat'
		]
	)

	e.shapeless(
		Item.of('kubejs:meat', 1),
		[
			'4x kubejs:meat_chunk'
		]
	)

	e.campfireCooking('kubejs:cooked_meat', 'kubejs:meat', 0, 600)


	e.shaped(
		Item.of('custom:animal_trap', 1),
		[
		  ' AA',
		  'BAA',
		  '   '
		],
		{
		  A: 'minecraft:oak_planks',
		  B: 'minecraft:stick'
		}
	)
})