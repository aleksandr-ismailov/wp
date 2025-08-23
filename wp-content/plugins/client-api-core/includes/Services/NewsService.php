<?php
namespace ClientAPI\Services;

class NewsService {
	public function get_aggregated_news( $tags, $page, $per_page ) {
		$requested_tags = [ 'react', 'nextjs', 'wordpress' ];

		if ( ! empty( $tags ) ) {
			$requested_tags = is_array( $tags ) ? $tags : explode( ',', $tags );
		}

		$tags_string = implode( ',', array_map( 'trim', $requested_tags ) );

		$articles = $this->fetch_devto_articles( $tags_string, $page, $per_page );

		if ( empty( $articles ) ) {
			return new \WP_Error( 'api_error', 'No articles found or API unavailable', [ 'status' => 404 ] );
		}

		return $this->format_news_response( $articles, $page, $per_page, $requested_tags );
	}

	private function fetch_devto_articles( $tags_string, $page, $per_page ) {
		$api_url = "https://dev.to/api/articles?tags={$tags_string}&page={$page}&per_page={$per_page}";

		$response = wp_remote_get(
			$api_url,
			[
				'timeout' => 30,
				'headers' => [ 'User-Agent' => 'WordPress/' . get_bloginfo( 'version' ) . '; ' . home_url() ],
			]
		);

		if ( is_wp_error( $response ) || wp_remote_retrieve_response_code( $response ) !== 200 ) {
			return [];
		}

		$body = wp_remote_retrieve_body( $response );
		$data = json_decode( $body, true );

		return is_array( $data ) ? $data : [];
	}

	private function format_news_response( $articles, $page, $per_page, $requested_tags ) {
		$items = [];

		foreach ( $articles as $article ) {
			$items[] = [
				'id'              => isset( $article['id'] ) ? intval( $article['id'] ) : 0,
				'title'           => isset( $article['title'] ) ? $article['title'] : '',
				'description'     => isset( $article['description'] ) ? $article['description'] : '',
				'url'             => isset( $article['url'] ) ? $article['url'] : '',
				'published_at'    => isset( $article['published_timestamp'] ) ? $article['published_timestamp'] : '',
				'tags'            => isset( $article['tags'] ) ? array_map( 'trim', explode( ',', $article['tags'] ) ) : [],
				'source'          => $this->determine_article_source( $article, $requested_tags ),
				'social_image'    => isset( $article['social_image'] ) ? $article['social_image'] : null,
				'reading_time'    => isset( $article['reading_time_minutes'] ) ? intval( $article['reading_time_minutes'] ) : null,
				'reactions_count' => isset( $article['public_reactions_count'] ) ? intval( $article['public_reactions_count'] ) : 0,
				'comments_count'  => isset( $article['comments_count'] ) ? intval( $article['comments_count'] ) : 0,
			];
		}

		return [
			'items'          => $items,
			'page'           => $page,
			'per_page'       => $per_page,
			'total_items'    => count( $items ),
			'has_more'       => count( $items ) === $per_page,
			'requested_tags' => $requested_tags,
		];
	}

	private function determine_article_source( $article, $requested_tags ) {
		if ( ! isset( $article['tags'] ) || empty( $article['tags'] ) ) {
			return 'other';
		}

		$article_tags = array_map( 'trim', array_map( 'strtolower', explode( ',', $article['tags'] ) ) );

		foreach ( $requested_tags as $tag ) {
			$tag = trim( strtolower( $tag ) );
			if ( in_array( $tag, $article_tags, true ) ) {
				return $tag;
			}
		}

		return 'other';
	}
}
