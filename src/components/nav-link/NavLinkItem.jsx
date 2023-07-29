/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import { updateLinks } from '../../redux/product/ProductSlice'

const NavLinkItem = (props) => {
    const dispatch = useDispatch()
    const links = useSelector(state => state.product.links)
    const { open, showDropdown, title,update,offDrop} = props
    return (
        <React.Fragment>
            <div class="nav-link__item">
                <div class="nav-link__item__root">
                    <div class="nav-link__item__root__link">
                        <i class="bx bxs-right-arrow small-icons" type="solid"></i>
                        <a onClick={()=>{
                            dispatch(updateLinks({
                                display:title.root,
                                link:'/catalog'
                            }))
                            update('INDEX',title)
                            }} title={title.root}><i class="fa fa-caret-right" aria-hidden="true"></i>{offDrop?<h4>{title.root}</h4>:title.root}</a>
                    </div>

                    {title.child.length>0&&!offDrop&&<div class="nav-link__item__root__dropdown__btn">
                        <i class="bx bx-chevron-down" onClick={() =>showDropdown(title.root)}></i>
                    </div>}
                </div>

                <ul class={open ? 'nav-link__dropdown__show' : 'nav-link__dropdown'} >
                    {title.child.map((element, key) => {
                        return (
                            <li class="nav-link__dropdown__item " key={key}>
                                <a class="nav-link__dropdown__aothun" onClick={() =>{
                                    dispatch(updateLinks({
                                        display:element.display,
                                        link:'/catalog'
                                    }))
                                    update('INDEX',element)
                                    }} title={element.display}>{element.display}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </React.Fragment>

    )
}

export default NavLinkItem
