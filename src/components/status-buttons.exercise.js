/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import {FaBook, FaCheckCircle, FaMinusCircle, FaPlusCircle, FaTimesCircle} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
// 🐨 you'll need useQuery, useMutation, and queryCache from 'react-query'
// 🐨 you'll also need client from 'utils/api-client'
import {useAsync} from 'utils/hooks'
import * as colors from 'styles/colors'
import {CircleButton, Spinner} from './lib'
import {useCreateListItem, useListItems, useRemoveListItem, useUpdateListItem} from '../utils/list-items.exercise'

function TooltipButton({label, highlight, onClick, icon, ...rest}) {
  const {isLoading, isError, error, run} = useAsync()

  function handleClick() {
    run(onClick())
  }

  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={{
          backgroundColor: 'white',
          ':hover,:focus': {
            color: isLoading
              ? colors.gray80
              : isError
                ? colors.danger
                : highlight,
          },
        }}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error.message : label}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  )
}

function StatusButtons({user, book}) {
  const listItem = useListItems(user, book.id)

  const [update] = useUpdateListItem(user)
  const [remove] = useRemoveListItem(user)
  const [create] = useCreateListItem(user)

  return (
    <React.Fragment>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton
            label='Unmark as read'
            highlight={colors.yellow}
            // 🐨 add an onClick here that calls update with the data we want to update
            // 💰 to mark a list item as unread, set the finishDate to null
            // {id: listItem.id, finishDate: null}
            onClick={() => update({id: listItem.id, finishDate: null})}
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label='Mark as read'
            highlight={colors.green}
            // 🐨 add an onClick here that calls update with the data we want to update
            // 💰 to mark a list item as read, set the finishDate
            // {id: listItem.id, finishDate: Date.now()}
            onClick={() => update({id: listItem.id, finishDate: Date.now()})}
            icon={<FaCheckCircle />}
          />
        )
      ) : null}
      {listItem ? (
        <TooltipButton
          label='Remove from list'
          highlight={colors.danger}
          // 🐨 add an onClick here that calls remove
          onClick={() => remove({id: listItem.id})}
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label='Add to list'
          highlight={colors.indigo}
          // 🐨 add an onClick here that calls create
          onClick={() => create({bookId: book.id})}
          icon={<FaPlusCircle />}
        />
      )}
    </React.Fragment>
  )
}

export {StatusButtons}
