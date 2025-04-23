const MACHINE_NAME = 'custom:animal_trap'
const BAIT_ITEM = 'kubejs:meat_chunk'
const PROCESSTIME_MIN = 7*60*20 // 7 min
const PROCESSTIME_MAX = 20*60*20 // 20 min
const NO_OUTPUT_CHANCE = 0.2


MBDMachineEvents.onAfterRecipeWorking(MACHINE_NAME, (e) => {
	const mbdEvent = e.getEvent()
    const { machine } = mbdEvent

	// remove bait 
	const slotIn = machine.getTraitByName("in").storage
	slotIn.extractItem(0, 1, false, false)
})


MBDMachineEvents.onRecipeWorking(MACHINE_NAME, (e) => {
	const mbdEvent = e.getEvent()
    const { machine } = mbdEvent

	// cancel recipe when input missing
	const slotIn = machine.getTraitByName("in").storage

	if (slotIn.getStackInSlot(0).count == 0) {
		mbdEvent.setCanceled(true)
	}
})


MBDMachineEvents.onRecipeStatusChanged(MACHINE_NAME, (e) => {
	const mbdEvent = e.getEvent()
    const { machine, oldStatus } = mbdEvent

	// change to collapse state only, trigger animation later
	if (oldStatus === 'WORKING') {
		machine.setMachineState('closed')
		machine.setCustomData({ triggerCollapse: true })
	}
})


MBDMachineEvents.onTick(MACHINE_NAME, (e) => {
	const mbdEvent = e.getEvent()
    const { machine } = mbdEvent

	// trigger collapse animation
	let triggerCollapse = machine.getCustomData().triggerCollapse

	if (triggerCollapse) {
		machine.triggerGeckolibAnim('collapse', 1)
		machine.setCustomData({ triggerCollapse: false })
	}
})


MBDMachineEvents.onRightClick(MACHINE_NAME, (e) => {
	const mbdEvent = e.getEvent()
    const { machine, player } = mbdEvent

	// trigger arming animation
    if (machine.getMachineStateName() === 'closed') { 
		machine.setMachineState('base')
		machine.triggerGeckolibAnim('arm', 1)
	}

	// directly insert bait
	const slotIn = machine.getTraitByName("in").storage
	const handItem = player.mainHandItem || player.offHandItem

	if (handItem.getId() === BAIT_ITEM) {
		const storedItem = slotIn.getStackInSlot(0)

		if (storedItem.empty) {
			slotIn.insertItem(0, handItem.withCount(1), false, false)
			handItem.shrink(1)

			// dont open ui
			mbdEvent.setInteractionResult('fail')
		}
	}
})


MBDMachineEvents.onBeforeRecipeModify(MACHINE_NAME, (e) => {
    const mbdEvent = e.getEvent()
	const { recipe } = mbdEvent

	const builder = recipe.toBuilder()
	
	// randomize processing time
	builder.duration(randomBetween(PROCESSTIME_MIN, PROCESSTIME_MAX))
	
	// random chance for no output
	if (Math.random() < NO_OUTPUT_CHANCE) {
		const capabilityItem = MBDRegistries.RECIPE_CAPABILITIES.get('item')
		builder.removeOutputs(capabilityItem)
	}
	
	mbdEvent.setRecipe(builder.buildMBDRecipe())
});



function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}