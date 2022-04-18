import {queryCache, useMutation, useQuery} from 'react-query'
import {client} from './api-client.final'

const defaultMutationOptions = {
  onSettled: () => queryCache.invalidateQueries('list-items'),
};

function useListItems(user) {
  // 🐨 call useQuery to get the list item from the list-items endpoint
  // queryKey should be 'list-items'
  // queryFn should call the 'list-items' endpoint with the user's token
  const {data: listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: () => client(`list-items`, {token: user.token}).then(data => data.listItems),
  })
  return listItems ?? []
}

function useListItem(user, bookId) {
  // invoke useListItems hook to return listItems here.
  const listItems = useListItems(user)
  // 🦉 NOTE: the backend doesn't support getting a single list-item by it's ID
  // and instead expects us to cache all the list items and look them up in our
  // cache. This works out because we're using react-query for caching!
  return listItems.find(li => li.bookId === bookId) ?? null
}

function useUpdateListItem(user, options) {
  // 🐨 call useMutation here
  // the mutate function should call the list-items/:listItemId endpoint with a PUT
  //   and the updates as data. The mutate function will be called with the updates
  //   you can pass as data.
  // 💰 if you want to get the list-items cache updated after this query finishes
  // the use the `onSettled` config option to queryCache.invalidateQueries('list-items')
  // 💣 DELETE THIS ESLINT IGNORE!! Don't ignore the exhaustive deps rule please

  return useMutation(
    updates =>
      client(`list-items/${updates.id}`, {
        method: 'PUT',
        data: updates,
        token: user.token,
      }),
    {...defaultMutationOptions, ...options},
  )
}

function useRemoveListItem(user, options) {
  // 🐨 call useMutation here and assign the mutate function to "remove"
  // the mutate function should call the list-items/:listItemId endpoint with a DELETE
  return useMutation(
    ({id}) =>
      client(`list-items/${id}`, {
        method:'DELETE',
        token: user.token,
      }),
    {...defaultMutationOptions, ...options},
  )
}

function useCreateListItem(user, options) {
  // 🐨 call useMutation here and assign the mutate function to "create"
  // the mutate function should call the list-items endpoint with a POST
  // and the bookId the listItem is being created for.
  return useMutation(
    ({bookId}) =>
      client(`list-items`, {
        data: {bookId},
        token: user.token,
      }),
    {...defaultMutationOptions, ...options},
  )
}

export {useListItems, useListItem, useUpdateListItem, useRemoveListItem, useCreateListItem}
