import { localDateTime } from '@/common/commonFunctions'
import { IconButton, Tooltip } from '@mui/material'

export default function CustomColumns(tableValues) {
  const columns = tableValues.map((data, i) => {
    if (data.type === 'imagewithurl') {
      return {
        ...data,
        sortable: false,
        renderCell: ({ row }) => {
          return (
            <img
              className={`tableimage`}
              src={`${row[data.field]?.url || row[data.field][0]?.url}`}
              alt={row.title}
              // loading="lazy"
              onError={(e) => (e.target.src = '/assets/images/noImg.png')}
            />
          )
        },
      }
    } else if (data.type === 'action') {
      return {
        ...data,
        renderCell: (obj) => {
          return (
            <>
              {data.isMultiple ? (
                <>
                  {data.multiple.map((dt, i) => {
                    return (
                      <Tooltip title={dt.tooltipTitle} key={i}>
                        <IconButton onClick={() => dt.onclick(obj.row, dt.clickType)}>{dt.icon}</IconButton>
                      </Tooltip>
                    )
                  })}
                </>
              ) : (
                <>
                  <Tooltip title={data.tooltipTitle}>
                    <IconButton onClick={() => data.onclick(obj.row, data.clickType)}>{data.icon}</IconButton>
                  </Tooltip>
                </>
              )}
            </>
          )
        },
      }
    } else if (data.type === 'dateTime') {
      return {
        ...data,
        sortable: false,
        renderCell: ({ row }) => {
          return <>{localDateTime(row[data.field])}</>
        },
      }
    } else if (data.type === 'colour') {
      return {
        ...data,
        sortable: false,
        renderCell: ({ row }) => {
          return <div style={{ backgroundColor: `${row[data.field] || '#000'}`, padding: '10px 50px' }}></div>
        },
      }
    } else {
      return { ...data }
    }
  })

  return columns
}
