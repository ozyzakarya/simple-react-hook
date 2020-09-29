import React from 'react'
import {ReactComponent as IconFilter} from '../Assets/Icons/sliders.svg'
import {ReactComponent as IconSearch} from '../Assets/Icons/search.svg'
import PrintIcon from '@material-ui/icons/Print';
import ImportExportIcon from '@material-ui/icons/ImportExport';

const SearchCard = ({setKey}) => {

    const handlePrint = () => {
        console.log('heyyyy')
    }
    return (
        <div className="search">
            <div className="search__input">
                <IconSearch/>
                <input onChange={({target : {value}}) => {
                    setKey(value)
                }} placeholder="Search anything..." type="text"/>
            </div>
            <div className="search__button" style={{marginRight: 10}}>
                <IconFilter/>
            </div>
                <PrintIcon onClick={handlePrint}/>
                <ImportExportIcon />
        </div>
    )
}


export default SearchCard