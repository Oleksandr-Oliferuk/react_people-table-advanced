import { SearchLink } from './SearchLink';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  function setSearchWith(params: any) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': sex === null })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={cn({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={cn({ 'is-active': sex === 'f' })}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query ?? ''}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const inputQuery = event.target.value;

              setSearchWith({ query: inputQuery.length ? inputQuery : null });
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => {
              return (
                <SearchLink
                  data-cy="century"
                  className={cn('button', 'mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  key={century}
                  params={{
                    centuries: centuries.includes(century)
                      ? centuries.filter(cent => century !== cent)
                      : [...centuries, century],
                  }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              className={cn('button', 'is-success', {
                'is-outlined': centuries.length,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
