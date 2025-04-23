Platform.mods.kubejs.name = 'Custom'

StartupEvents.registry('item', e => {

	e.create('meat').food(f => {
			f
				.hunger(6)
				.saturation(0.5)
				.alwaysEdible()
				.meat() // dog food
			})
		.displayName('Meat')
		.texture('custom:item/meat')

	e.create('meat_chunk').food(f => {
			f
				.hunger(1)
				.alwaysEdible()
				.meat() // dog food
			})
		.displayName('Meat Chunk')
		.texture('custom:item/meat_chunk')

	e.create('cooked_meat').food(f => {
			f
				.hunger(10)
				.saturation(0.5)
				.alwaysEdible()
				.meat() // dog food
			})
		.displayName('Cooked Meat')
		.texture('custom:item/cooked_meat')

})