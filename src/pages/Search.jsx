import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import Collections from '../components/Collections';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      currentArtistName: '',
      buttonState: true,
      loading: false,
      requestResult: [],
      previousArtist: '',
    };
    this.ArtistName = this.ArtistName.bind(this);
    this.searchArtitsName = this.searchArtitsName.bind(this);
  }

  ArtistName({ target }) {
    this.setState(
      () => ({ currentArtistName: target.value }),
      () => this.changeButtonState(),
    );
  }

  changeButtonState() {
    const { currentArtistName } = this.state;
    if (currentArtistName.length < 2) {
      this.setState({ buttonState: true });
    } else {
      this.setState({ buttonState: false });
    }
  }

  async searchArtitsName() {
    console.log('Olá');
    const { currentArtistName } = this.state;
    this.setState(({
      previousArtist: currentArtistName,
      loading: true,
    }), async () => {
      this.setState({
        currentArtistName: '',
      });
      const collections = await searchAlbumsAPI(currentArtistName);
      console.log(collections);
      this.setState({
        requestResult: collections,
        loading: false,
      });
    });
  }

  render() {
    const {
      currentArtistName,
      buttonState,
      loading,
      requestResult,
      previousArtist,
    } = this.state;
    return (
      <div data-testid="page-search">
        <form>
          <input
            type="text"
            placeholder="Banda ou Artista"
            data-testid="search-artist-input"
            value={ currentArtistName }
            onChange={ this.ArtistName }
          />
          <button
            type="button"
            disabled={ buttonState }
            data-testid="search-artist-button"
            onClick={ this.searchArtitsName }
          >
            Pesquisar
          </button>
          { loading ? <Loading />
            : (
              <Collections
                requestResult={ requestResult }
                previousArtist={ previousArtist }
              />)}
        </form>
      </div>
    );
  }
}

export default Search;
