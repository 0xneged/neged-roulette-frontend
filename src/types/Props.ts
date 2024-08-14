import { ComponentChildren, JSX } from 'preact'

export type ClassName = JSX.HTMLAttributes<HTMLDivElement>['className']

export interface ClassNameProp {
  className?: ClassName
}

export interface ChildrenProp {
  children: ComponentChildren
}
