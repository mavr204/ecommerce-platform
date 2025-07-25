package com.ecommerce.bean;


import java.util.Arrays;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Table(name="productImages")
@Entity
public class Image {
	 @Id
	    private Long id;

	    @Lob
	    private byte[] data;

		public Image() {
			super();
			// TODO Auto-generated constructor stub
		}

		public Image(Long id, byte[] data) {
			super();
			this.id = id;
			this.data = data;
		}

		@Override
		public String toString() {
			return "Img [id=" + id + ", data=" + Arrays.toString(data) + "]";
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public byte[] getData() {
			return data;
		}

		public void setData(byte[] data) {
			this.data = data;
		}
}
