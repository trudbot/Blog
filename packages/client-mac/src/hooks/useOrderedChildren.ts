// copy from element-plus
import type {ComponentInternalInstance, VNode} from 'vue'
// 稍有魔改
import {isVNode, shallowRef} from 'vue'
import {flattedChildren} from '../utils/flattedChildren'

export const getOrderedChildren = <T>(
    vm: ComponentInternalInstance,
    childComponentName: string,
    children: Record<number, T>
): T[] => {
    const nodes = flattedChildren(vm.subTree).filter(
        (n): n is VNode =>
            isVNode(n) &&
            (n.type as any)?.name === childComponentName &&
            !!n.component
    )
    const uids = nodes.map((n) => n.component!.uid)
    return uids.map((uid) => children[uid]).filter((p) => !!p)
}

export const useOrderedChildren = <T extends { uid: number }>(
    vm: ComponentInternalInstance,
    childComponentName: string,
    addChildCallback?: (child: T) => void,
    removeChildCallback?: (uid: number) => void,
) => {
    const children: Record<number, T> = {}
    const orderedChildren = shallowRef<T[]>([])

    const addChild = (child: T) => {
        children[child.uid] = child
        orderedChildren.value = getOrderedChildren(vm, childComponentName, children)
        addChildCallback?.(child)
    }
    const removeChild = (uid: number) => {
        delete children[uid]
        orderedChildren.value = orderedChildren.value.filter(
            (children) => children.uid !== uid
        )
        removeChildCallback?.(uid);
    }

    return {
        children: orderedChildren,
        addChild,
        removeChild,
    }
}