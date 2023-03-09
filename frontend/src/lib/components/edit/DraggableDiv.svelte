<script lang="ts">
	export let updateArray: any[] | undefined;

	export const drop = (event: DragEvent, target: number, item: any, saveFn: Function) => {
		if (event.dataTransfer) {
			const obj = JSON.parse(event.dataTransfer.getData('text/plain'));

			let updateArraysSame =
				obj.array.length == updateArray?.length &&
				obj.array.every(function (element: Object, index: number) {
					let objString = JSON.stringify(element);
					let updateObjString = JSON.stringify(updateArray![index]);
					return objString === updateObjString;
				});
			let itemsSameType = Object.keys(item).every(function (element) {
				if (element === 'clueImage') return true;
				return Object.keys(obj.item).includes(element);
			});

			if (itemsSameType && updateArraysSame) {
				event.dataTransfer.dropEffect = 'move';
				const newArrayOrder = updateArray;
				if (obj.start < target) {
					newArrayOrder?.splice(target + 1, 0, newArrayOrder[obj.start]);
					newArrayOrder?.splice(obj.start, 1);
				} else {
					newArrayOrder?.splice(target, 0, newArrayOrder[obj.start]);
					newArrayOrder?.splice(obj.start + 1, 1);
				}
				updateArray = newArrayOrder;
				saveFn(updateArray, obj.start, target);
				event.stopPropagation();
			}
		}
	};

	export const dragStart = (event: DragEvent, start: number, item: any) => {
		if (event.dataTransfer) {
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.dropEffect = 'move';
			let object = {
				start: start,
				item: item,
				array: updateArray
			};
			event.dataTransfer.setData('text/plain', JSON.stringify(object));
			event.stopPropagation();
		}
	};
</script>

<div
	on:dragstart
	on:drop
	on:dragover|preventDefault={() => {
		return false;
	}}
	draggable={true}
>
	<slot />
</div>
